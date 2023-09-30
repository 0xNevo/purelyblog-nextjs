declare type Post = {
  _id: string;
  title: string;
  text: string;
  image: string;
  children: Post[];
  author: User;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
};
