import './Button.scss'

type CreateButtonProps = {
  onClick: () => void;
}

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <button className="create-button" onClick={onClick}>
      Add New Expense
    </button>
  );
}

export default CreateButton;