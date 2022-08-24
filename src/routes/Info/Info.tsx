import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";

import CandidateAtom from "../../recoil/atoms/candidateAtom";
import {
  Button,
  ControlGroup,
  Radio,
  RadioGroup,
  Spinner,
  TextArea,
} from "@blueprintjs/core";

import { digestMessage, getRandomInt } from "../../utils";
import { ICandidateInfo } from "../../components/CandidateInfo/Types";
import CandidateInfo from "../../components/CandidateInfo/CandidateInfo";
import candidateInfo from "../../components/CandidateInfo/CandidateInfo";

const Info2 = () => {
  const [candidate, setCandidate] = useRecoilState(CandidateAtom);
  const [comment, setComment] = useState("");
  const [admission, setAdmission] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    setCandidate({ status: "pending" });

    try {
      const value = localStorage.getItem(id);
      if (value) {
        const data = JSON.parse(value);
        setCandidate({ data, status: "idle", locked: true });
        setAdmission(data.admission);
        setComment(data.comment);
      }
    } catch (e) {
      setCandidate({ status: "idle", error: "Item not found" });
    }
  }, [id]);

  const handleGetNewCandidate = async () => {
    navigate(`/info`, { replace: true });
    setCandidate({ status: "pending" });
    setComment("");
    setAdmission("");

    axios
      .get("https://randomuser.me/api/", {
        params: {
          exc: "login",
        },
      })
      .then((response: AxiosResponse) => {
        setCandidate({
          status: "idle",
          data: response.data.results[0],
        });
      })
      .catch((e) =>
        setCandidate({
          status: "idle",
          error: e.message,
        })
      );
  };

  const handleAdmissionChange = (event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement)?.value;
    setAdmission(value);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target?.value !== comment) {
      setComment(event.target.value);
    }
  };

  const handleSave = () => {
    setCandidate({ ...candidate, status: "pending" });

    if (!candidate.data) {
      setCandidate({
        ...candidate,
        status: "idle",
        error: "No data to save!",
      });
      return;
    }

    setTimeout(async () => {
      const updatedData = {
        ...candidate.data,
        admission,
        comment,
      } as ICandidateInfo;

      let key = id;
      if (!key) {
        console.log("make new hash");
        const hash = await digestMessage(
          `${updatedData.name?.last}${updatedData.name?.first}${updatedData.dob?.date}`
        );
        key = hash.substring(0, 20);
      }

      localStorage.setItem(key, JSON.stringify(updatedData));
      setCandidate({
        data: updatedData,
        status: "idle",
        locked: true,
      });

      navigate(`/info/${key}`, { replace: true });
    }, getRandomInt(100, 3500));
  };

  const handleUnlock = () => setCandidate({ ...candidate, locked: false });

  return (
    <>
      {console.log(candidate)}
      {candidate.status === "pending" && (
        <div className="LoadingOverlay">
          <Spinner />
        </div>
      )}
      {candidate.error && <div className="Error">Error: {candidate.error}</div>}
      {candidate.data && <CandidateInfo data={candidate.data} />}
      <div className="ReviewControls">
        {candidate.data ? (
          <>
            <RadioGroup
              inline={true}
              onChange={handleAdmissionChange}
              selectedValue={admission}
              disabled={candidate.locked}
            >
              <Radio label="Approve" value="Approve" />
              <Radio label="Decline" value="Decline" />
            </RadioGroup>
            <TextArea
              placeholder="Leave a comment here, if desired..."
              fill={true}
              onChange={handleCommentChange}
              value={comment}
              disabled={candidate.locked}
            ></TextArea>
            <ControlGroup className="InfoControlGroup">
              <Button
                intent={candidate.locked ? "primary" : undefined}
                className="NewCandidateButton"
                icon="refresh"
                onClick={handleGetNewCandidate}
              >
                New Candidate
              </Button>
              {!candidate.locked ? (
                <>
                  <Button
                    intent="primary"
                    icon={candidate.locked ? "lock" : "saved"}
                    className="SaveButton"
                    onClick={handleSave}
                    disabled={!admission}
                  >
                    {candidate.status === "pending" && candidate.data
                      ? "Saving..."
                      : "Save"}
                  </Button>
                </>
              ) : (
                <Button
                  icon="lock"
                  className="EditButton"
                  onClick={handleUnlock}
                >
                  Unlock
                </Button>
              )}
            </ControlGroup>
          </>
        ) : (
          <Button
            intent="primary"
            className="NewCandidateButton"
            icon="refresh"
            onClick={handleGetNewCandidate}
          >
            New Candidate
          </Button>
        )}
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Info2;
