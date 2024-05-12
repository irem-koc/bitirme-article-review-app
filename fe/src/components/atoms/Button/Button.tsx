type Props = {
  content: string;
  style: string[];
  onclick: () => Promise<void>;
};

const Button = (props: Props) => {
  const { content, style, onclick } = props;
  return (
    <button className={style.join(" ")} onClick={() => onclick()}>
      {content}
    </button>
  );
};

export default Button;
