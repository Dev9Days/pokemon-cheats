import { MessageCircle } from "lucide-react";

type CommentsButtonProps = {
  onClick: () => void;
};

export function CommentsButton({ onClick }: CommentsButtonProps) {
  return (
    <button className="comments-fab" type="button" onClick={onClick} aria-label="댓글 열기">
      <MessageCircle size={20} />
    </button>
  );
}
