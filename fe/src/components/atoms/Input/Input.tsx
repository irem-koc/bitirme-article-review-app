type Props = {
  type: string;
  id: string;
  style: string[];
};

const Input = (props: Props) => {
  const { type, id, style } = props;
  return (
    <>
      <input type={type} id={id} className={style.join(" ")} />
    </>
  );
};

export default Input;
