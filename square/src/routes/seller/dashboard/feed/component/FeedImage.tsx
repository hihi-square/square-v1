/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useRef, useEffect, useState } from "react";
import axios from "axios";

import {
  Unstable_Grid2 as Grid,
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { REST_API } from "redux/redux";
import CheckIcon from "@mui/icons-material/Check";

//  로드하는 타입과, Props를 설정합니다. ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
type POST = {
  content: string;
  state: string;
  images: // url과 thumbnail은 S3 이미지 컨트롤러를 이용해서 생성
  {
    url: string;
    order: number;
    thumbnail: string;
  }[];
};

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentNotice: POST;
  setCurrentNotice: any;
  reRender: any;
  currentSnoId: number;
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

const token = localStorage.getItem("accessToken");

// 인터넷 상의 경로를 datURL으로 바꿉니다.
async function urlToDataURL(url: string): Promise<string> {
  const response = await fetch(url);
  const initialBlob = await response.blob();

  // 원래 blob에서 데이터를 가져와서 새로운 blob을 image/png 타입으로 생성합니다.
  const pngBlob = new Blob([initialBlob], { type: "image/png" });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject("Failed to convert blob to dataURL");
      }
    };
    reader.readAsDataURL(pngBlob);
  });
}

// dataURL을 Blob으로 바꿉니다.
const dataURLToBlob = (dataURL: string) => {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

export default function FeedImage({
  setOpen,
  currentNotice,
  setCurrentNotice,
  reRender,
  currentSnoId,
}: Props) {
  const cropperRef = useRef<ReactCropperElement>(null); // 크롭 요소

  const [image, setImage] = useState<string>(""); // 현재 이미지 DataURL

  const [tmpName, setName] = useState<string>(""); // 작업중인 파일명(임시)
  const [tmpCrop, setTmpCrop] = useState<string>(""); // 작업중인 이미지 파일(임시)
  const [selectIdx, setSelectIdx] = useState<number>(0);
  const [croppedImage, setCroppedImage] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  const [pageError, setPageError] = useState<string>(""); // 페이지 로드 시의 상단 에러
  const [error, setError] = useState<string>(""); // 업로드하는 파일 에러
  const [textErr, setTextErr] = useState<string>("본문은 반드시 입력해주세요."); // 그외의 에러 : 여기서는 본문 에러

  // 첫 로딩 시에, 만약 넘겨온 것에 image가 있다면, 그 이미지를 croppedImage와 Filename에 넣어줍니다.
  useEffect(() => {
    if (currentNotice.images && currentNotice.images.length > 0) {
      for (const imagedata of currentNotice.images) {
        urlToDataURL(imagedata.url)
          .then((dataURL) => {
            setCroppedImage((prev) => [...prev, dataURL]);
            setFileName((prev) => [...prev, `originImages`]);
          })
          .catch((err) => {
            console.log(err);
            setPageError("기존 이미지를 로드하는 데에 실패했습니다.");
          });
      }
      setContent(currentNotice.content);
    }
  }, []);

  // 이미지 파일을 폼태그로 올리면 image(file)을 변경합니다.
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const MAX_SIZE = 10 * 1024 * 1024; // 최대 10MB

    if (file && file.size > MAX_SIZE) {
      setError("파일 크기가 10MB를 넘어갑니다.");
      return;
    }

    if (file && !file.type.startsWith("image/")) {
      setError("유효한 이미지 형식이 아닙니다.");
      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string); // 콜백 : onload가 끝나면 string으로 DataURL 저장
      };
      reader.onerror = () => {
        setError("파일 업로드에 실패했습니다."); // 콜백 : onload 실패시 적용
      };
      reader.readAsDataURL(file); // DataURL로 변경
      setName(file.name); // 파일 이름을 저장
    }
  };

  // 이미지를 크롭하여 비율을 조정하고, 임시 파일로 저장합니다.
  const handleAspectCrop = () => {
    const cropper = cropperRef?.current?.cropper;

    if (cropper) {
      // 원본 이미지의 비율에 따라 최종적으로 어떤 크기로 크롭할지 결정합니다.
      const originalData = cropper.getData();
      const originalWidth = originalData.width;
      const originalHeight = originalData.height;

      let targetWidth = 0;
      let targetHeight = 0;

      if (originalWidth / originalHeight > 400 / 300) {
        // 가로가 긴 경우
        targetWidth = 400;
        targetHeight = 400 / (originalWidth / originalHeight);
      } else {
        // 세로가 긴 경우
        targetHeight = 300;
        targetWidth = 300 * (originalWidth / originalHeight);
      }

      // 해당 크기로 크롭
      const croppedCanvas = cropper.getCroppedCanvas({
        width: targetWidth,
        height: targetHeight,
      });

      // 3. 크롭된 이미지를 중앙에 위치시키고, 주변을 검정색으로 채우는 새로운 Canvas 생성
      const finalCanvas = document.createElement("canvas");

      finalCanvas.width = 400;
      finalCanvas.height = 300;
      const ctx = finalCanvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 400, 300);
        ctx.drawImage(
          croppedCanvas,
          (400 - targetWidth) / 2,
          (300 - targetHeight) / 2,
          targetWidth,
          targetHeight
        );
      }

      setTmpCrop(finalCanvas.toDataURL()); // TmpCrop에 데이터 URL로 저장
    }
  };

  // 이미지를 크롭하고, 이미지를 그대로 늘립니다.
  const handleCrop = () => {
    const cropper = cropperRef?.current?.cropper;

    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();

      // 크롭된 이미지를 400x300 크기로 늘리기 위한 새 Canvas 생성
      const finalCanvas = document.createElement("canvas");

      finalCanvas.width = 400;
      finalCanvas.height = 300;
      const ctx = finalCanvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 400, 300);
        ctx.drawImage(croppedCanvas, 0, 0, 400, 300);
      }

      setTmpCrop(finalCanvas.toDataURL());
    }
  };

  // 임시 사진, 파일명 정보를 실제 배열에 넣은 뒤에, 원본과 임시 이름을 모두 초기화합니다.
  const registImage = () => {
    const imgUrl = tmpCrop;
    const imgName = tmpName;

    setImage("");
    setName("");
    setTmpCrop("");
    setCroppedImage((prev) => [...prev, imgUrl]);
    setFileName((prev) => [...prev, imgName]);
  };

  // 배열의 이전 인덱스로 사진 이동
  const prevArr = () => {
    const newCroppedImage = [...croppedImage];
    const newFileName = [...fileName];

    const temp = newCroppedImage[selectIdx - 1];

    newCroppedImage[selectIdx - 1] = newCroppedImage[selectIdx];
    newCroppedImage[selectIdx] = temp;

    const tmpFile = newFileName[selectIdx - 1];

    newFileName[selectIdx - 1] = newFileName[selectIdx];
    newFileName[selectIdx] = tmpFile;

    setCroppedImage(newCroppedImage);
    setFileName(newFileName);
    setSelectIdx(selectIdx - 1);
  };

  // 배열의 이전 인덱스로 사진 이동
  const nextArr = () => {
    const newCroppedImage = [...croppedImage];
    const newFileName = [...fileName];

    const temp = newCroppedImage[selectIdx + 1];

    newCroppedImage[selectIdx + 1] = newCroppedImage[selectIdx];
    newCroppedImage[selectIdx] = temp;

    const tmpFile = newFileName[selectIdx + 1];

    newFileName[selectIdx + 1] = newFileName[selectIdx];
    newFileName[selectIdx] = tmpFile;

    setCroppedImage(newCroppedImage);
    setFileName(newFileName);
    setSelectIdx(selectIdx + 1);
  };

  // 배열에서 사진 삭제
  const deleteArr = () => {
    const newCroppedImage = [...croppedImage];
    const newFileName = [...fileName];

    newCroppedImage.splice(selectIdx, 1);
    newFileName.splice(selectIdx, 1);

    setCroppedImage(newCroppedImage);
    setFileName(newFileName);
    if (selectIdx >= newCroppedImage.length && selectIdx > 0) {
      setSelectIdx(selectIdx - 1);
    }
  };

  // 이미지를 업로드합니다.
  const postImage = () => {
    const formData = new FormData();

    // 모든 사진들을 Blob 파일로 변경을 한 뒤에 폼데이터에 넣습니다.
    for (let i = 0; i < croppedImage.length; i++) {
      const imageBlob = dataURLToBlob(croppedImage[i]);

      formData.append("images", imageBlob, fileName[i]);
    }
    axios
      .post(`${REST_API}api/files/daily`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        //
        const array = resp.data.urls;
        const tmpArray: any[] = [];
        const editArray: any[] = [];

        for (let i = 0; i < array.length; i++) {
          const obj = {
            url: array[i],
            order: i + 1,
            thumbnail: array[i],
          };

          const obj2 = {
            url: array[i],
            order: i + 1,
            thumb: array[i],
          };

          tmpArray.push(obj);
          editArray.push(obj2);
        }

        const newNotice = {
          content,
          state: currentNotice.state,
          images: tmpArray,
        };

        if (currentSnoId === 0) {
          axios
            .post(`${REST_API}store/daily`, newNotice, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((resp2) => {
              setPageError("성공");
              console.log(newNotice);
              setCurrentNotice({
                ...newNotice,
              });
            })
            .catch((err2) => {
              setPageError("피드 업로드에 실패했습니다.");
              console.log(err2);
            });
        } else {
          const patchNotice = {
            snoId: currentSnoId,
            content,
            state: currentNotice.state,
            images: editArray,
          };

          axios
            .patch(`${REST_API}store/daily`, patchNotice, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((resp2) => {
              setPageError("성공");
              console.log(patchNotice);
              setCurrentNotice({
                ...patchNotice,
              });
            })
            .catch((err2) => {
              setPageError("피드 업로드에 실패했습니다.");
              console.log(err2);
            });
        }
      })
      .catch((err) => {
        setPageError("사진 업로드에 실패했습니다.");
        console.log(err);
      });
  };

  // 초기화
  const initialize = () => {
    setImage(""); // 현재 이미지 DataURL

    setName(""); // 작업중인 파일명(임시)
    setTmpCrop(""); // 작업중인 이미지 파일(임시)
    setSelectIdx(0);
    setCroppedImage([]);
    setFileName([]);
    setContent("");
    setPageError(""); // 페이지 로드 시의 상단 에러
    setError(""); // 업로드하는 파일 에러
    setTextErr(""); // 그외의 에러 : 여기서는 본문 에러
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        width: "100%",
        alignItems: "center",
      }}
    >
      {pageError && (
        <Grid xs={11}>
          {/* 페이지 에러 출력 */}
          <Alert severity="error">{pageError}</Alert>
        </Grid>
      )}

      <Grid xs={11}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            fontWeight: 500,
          }}
        >
          이미지 파일을 첨부해주세요. (10MB 제한)
        </Typography>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image"
          name="image"
          type="file"
          disabled={croppedImage.length === 5 || Boolean(image)}
          onChange={(event) => {
            handleImageUpload(event);
          }}
        />
        <label htmlFor="image" style={{ width: "100%" }}>
          <Box onClick={() => document.getElementById("image")?.click()}>
            <TextField
              variant="outlined"
              fullWidth
              value={fileName}
              inputProps={{ readOnly: true }}
              disabled={croppedImage.length === 5 || Boolean(image)}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </label>
      </Grid>

      {croppedImage.length > 0 && (
        <Grid
          xs={11}
          container
          spacing={1}
          columns={15}
          sx={{ marginTop: "10px", alignItems: "center" }}
        >
          <Grid xs={15}>
            <Typography
              variant="body2"
              component="div"
              sx={{
                fontWeight: 500,
              }}
            >
              이미지 미리보기
            </Typography>
          </Grid>
          <Grid xs={15}>
            <img
              src={croppedImage[selectIdx]}
              alt="preview"
              style={{ width: "400px", height: "300px" }}
            />
          </Grid>
          {[0, 1, 2, 3, 4].map((idx: number) => (
            <Grid xs={3}>
              {croppedImage[idx] ? (
                <Button
                  fullWidth
                  onClick={() => {
                    setSelectIdx(idx);
                  }}
                  sx={
                    selectIdx === idx
                      ? { filter: "grayscale(1)", position: "relative" }
                      : {}
                  }
                >
                  <img
                    key={idx}
                    src={croppedImage[idx]}
                    alt="preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                  {selectIdx === idx && (
                    <CheckIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "2rem",
                        color: "white",
                      }}
                    />
                  )}
                </Button>
              ) : (
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                  이미지 추가
                </Grid>
              )}
            </Grid>
          ))}
          <Grid xs={15} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button disabled={selectIdx === 0} onClick={prevArr}>
              이전 순서로
            </Button>
            <Button onClick={deleteArr}>삭제하기</Button>
            <Button
              disabled={selectIdx === croppedImage.length - 1}
              onClick={nextArr}
            >
              다음 순서로
            </Button>
          </Grid>
        </Grid>
      )}
      <Grid xs={11}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            fontWeight: 500,
          }}
        >
          글 내용을 작성해주세요.
        </Typography>
        <TextField
          id="outlined-multiline-static"
          name="description"
          fullWidth
          multiline
          rows={4}
          value={content}
          error={textErr !== ""}
          helperText={textErr}
          onChange={(e) => {
            setContent(e.target.value);
            if (e.target.value === "")
              setTextErr("본문은 반드시 입력해주세요.");
            else setTextErr("");
          }}
        />
      </Grid>
      <Button
        onClick={() => {
          initialize();
          setOpen(false);
        }}
      >
        닫기
      </Button>
      {fileName && croppedImage && !error && !textErr && (
        <Button
          onClick={() => {
            postImage();
          }}
        >
          등록
        </Button>
      )}
      <Dialog
        open={Boolean(image)}
        onClose={() => {
          setImage("");
          setName("");
          setTmpCrop("");
        }}
      >
        <Box sx={{ width: "500px", height: "700px" }}>
          <Grid xs={11} sx={{ marginTop: "5px" }}>
            <Typography
              variant="body2"
              component="div"
              sx={{
                fontWeight: 500,
              }}
            >
              이미지를 크롭해주세요.
            </Typography>
            <Cropper src={image} ref={cropperRef} style={{ width: "100%" }} />
          </Grid>
          <Grid xs={11} sx={{ marginTop: "5px" }}>
            <Typography
              variant="body2"
              component="div"
              sx={{
                fontWeight: 500,
              }}
            >
              크롭된 결과물 (400x300px)
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              height: "300px",
              width: "400px",
              backgroundColor: "grey",
            }}
          >
            {tmpCrop && (
              <img
                src={tmpCrop}
                alt="preview"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </Grid>

          {/* 오다희 멍청이 */}
          <Button onClick={handleAspectCrop}>이미지 자르기(비율 유지)</Button>
          <Button onClick={handleCrop}>이미지 자르기</Button>
          <Button onClick={registImage} disabled={!tmpCrop}>
            이미지 등록
          </Button>
        </Box>
      </Dialog>
      <Dialog open={pageError === "성공"}>
        <DialogTitle>피드가 등록되었습니다.</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              initialize();
              setOpen(false);
              reRender(true);
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
