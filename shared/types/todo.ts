export type todo = {
  owner: string;
  title: string;
  completed: boolean;
};

export enum todoMessageType {
  Create,
  Remove,
  Update,
}

export type todoMessage = {
  todo: todo;
  type: todoMessageType;
};
