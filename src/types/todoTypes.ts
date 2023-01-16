export interface Todo {
	id: number;
    text: string;
    completed: boolean;
}

export interface Counter {
	allCount: number;
    completedCount: number;
    incompletedCount: number;
}