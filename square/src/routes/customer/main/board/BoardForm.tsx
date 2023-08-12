import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Avatar, Button, TextareaAutosize, Divider, Box } from '@mui/material';

function BoardForm(props: any) {

  const navigate = useNavigate();
  const urlParams = useParams<{ boardName: string, id: string }>();

  const [boardName, setBoardName] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    setBoardName(urlParams.boardName || '');
    setId(urlParams.id || '');
  }, [urlParams]);

  const postId = Number(id);
  const prevPostId = postId - 1;
  const nextPostId = postId + 1;

  console.log(1, boardName)
  console.log(1, id)
  console.log(2, postId)
  console.log(3, prevPostId)
  
  type Reply = {
    userProfileImage: string;
    username: string;
    date: string;
    content: string;
  };

  // 더미 데이터
  const post = {
    title: '게시글 제목',
    userProfileImage: '유저',
    username: '유저닉네임',
    date: '2023-08-09',
    views: 100,
    comments: 32,
    content: '헤어지자고 말하려 오늘...',
    replies: [
      // ... 여기에 댓글 데이터를 추가하면 됩니다.
    ] as Reply[]  // 'Reply' 타입을 적용
  };


  


  function getPostTitleById(postTitleId: number): string {
    
   return  `게시글 제목 ${postTitleId}`;
  }

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Typography variant="h5">{post.title}</Typography>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <Avatar src={post.userProfileImage} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{post.username}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{post.date}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">조회수: {post.views}</Typography>
          </Grid>
          <Grid item xs>
            <Typography align="right">{post.comments}</Typography>
          </Grid>
        </Grid>
        <Divider style={{ margin: '10px 0' }} />
        <Box minHeight="100px">
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
        </Box>
      </Grid>

        <Grid item xs={12}>
            <Divider style={{ margin: '20px 0' }} />
        </Grid>

        <Grid item xs={12}>
            {post.replies.map((reply, idx) => (
                <Box key={idx} border="1px solid #e0e0e0" borderRadius="5px" marginY="10px" padding="10px">
                    <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                        <Avatar src={reply.userProfileImage} sx={{ width: 24, height: 24 }} />

                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{reply.username}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{reply.date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" paragraph>{reply.content}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <TextareaAutosize
                minRows={3}
                style={{ width: '100%', marginBottom: '10px' }}
                placeholder="댓글을 작성하세요."
            />
            <Button variant="contained" color="primary">댓글 작성</Button>
        </Grid>

        <Grid item xs={12}>
        <Typography variant="body1">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/board/${boardName}/${prevPostId}`)}>
          이전 글: {getPostTitleById(prevPostId)}
          </span>
        </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <Typography variant="body1">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/board/${boardName}/${nextPostId}`)}>
          다음 글: {getPostTitleById(nextPostId)}
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default BoardForm;