import { atom } from "recoil";
import { ICandidateInfo } from "../../components/CandidateInfo/Types";

interface ICandidateAtom {
  status: "pending" | "saving" | "idle";
  data?: ICandidateInfo;
  admission?: string;
  comment?: string;
  error?: string;
  locked?: boolean;
}

const candidateAtom = atom({
  key: "candidateState",
  default: {
    status: "idle",
  } as ICandidateAtom,
});

export default candidateAtom;
