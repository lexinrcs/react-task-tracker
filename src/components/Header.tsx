import React from "react";
import { Button } from "./Button";

interface Props {
    title: 'Task Tracker';
    showAdd: boolean;
    onAdd: ()=>void;
}

export const Header:React.FC<Props> = ({title, onAdd, showAdd}) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAdd ? 'green' : 'red'} text={`${showAdd ? 'Close' : 'Add'}`} click={onAdd}/>
        </header>
    );
};