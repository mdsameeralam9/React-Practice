import VirtualList from ".";
import "./styles.css";

const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

export default function Virtualisation() {
  return (
    <VirtualList list={LIST} height={400} width={300} itemHeight={35} />
  );
}