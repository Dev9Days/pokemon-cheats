import { QuestionMarkIcon } from "./QuestionMarkIcon";

export function HelpButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="help-fab" type="button" onClick={onClick} aria-label="치트 사용 가이드 열기">
      <QuestionMarkIcon size={24} />
    </button>
  );
}
