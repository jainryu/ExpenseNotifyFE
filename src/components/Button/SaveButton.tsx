type SaveButtonProps = {
  onClick: (e: React.FormEvent) => void;
}

const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <button className="save-button" onClick={onClick}>
      Save
    </button>
  );
}

export default SaveButton;