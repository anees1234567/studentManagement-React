export type studentListType={
    name:string;
    email:string;
    age:number;
    studentClass:string;
    id?:number|string;
    _id?:string;
    subjects?:{id:number,name:string}[];
}

export type studentListResponseType={
    items:studentListType[];
    totalCount:number;
}

export type studentformType={
    name:string;
    email:string;
    Age:number;
    class:string;
    subjects:string[];
}

export type searchParamsType={
    pageNumber:number;
    pageSize:number;
    filter:{
        searchText?:string;
    }
}
