export interface Iproduct {
  id: number;
  userId: number;
  image: string; //
  thumbnail: string; //
  categoryId: number; //
  categoryName: string;
  name: string;
  signature: boolean;
  popular: boolean;
  price: number;
  status: string;
  createdAt: string;
  modifiedAt: string;
  salRecord: number;
  description: string;
  sequence: number;
}

export interface Icategory {
  id: number;
  userId: number;
  sequence: number;
  name: string;
}

export interface Itype {
  id: number;
  name: string;
}
