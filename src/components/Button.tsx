interface Props {
    text: string;
    color: string;
    click: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const Button:React.FC<Props> = ({text, color, click}) => {

    return(
        <button className="btn" style={{backgroundColor: color}} onClick={click}> {text} </button>
    )
}