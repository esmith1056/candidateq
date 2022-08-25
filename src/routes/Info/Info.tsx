import { useState, useEffect, FormEvent } from "react";
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
} from "@blueprintjs/core";

import { digestMessage, getRandomInt } from "../../utils";
import { ICandidateInfo } from "../../components/CandidateInfo/Types";
import CandidateInfo from "../../components/CandidateInfo/CandidateInfo";
import CommentBox from "../../components/CommentBox/CommentBox";

const Info2 = () => {
  const [candidate, setCandidate] = useRecoilState(CandidateAtom);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setCandidate({ status: "idle" });
      return;
    }

    setCandidate({ status: "pending" });

    try {
      const value = localStorage.getItem(id);
      if (value) {
        const data = JSON.parse(value);
        setCandidate({ data, status: "idle", locked: true });
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
    setCandidate({
      ...candidate,
      data: { ...candidate.data, admission: value } as ICandidateInfo,
    });
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
      let key = id;
      if (!key) {
        console.log("make new hash");
        const hash = await digestMessage(
          `${candidate.data?.name?.last}${candidate.data?.name?.first}${candidate.data?.dob?.date}`
        );
        key = hash.substring(0, 20);
      }

      const update = {
        ...candidate.data,
        comment,
      } as ICandidateInfo;

      localStorage.setItem(key, JSON.stringify(update));
      setCandidate({
        ...candidate,
        data: update,
        status: "idle",
        locked: true,
      });

      navigate(`/info/${key}`, { replace: true });
    }, getRandomInt(100, 3500));
  };

  const handleUnlock = () => setCandidate({ ...candidate, locked: false });

  return (
    <>
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
              selectedValue={candidate.data?.admission}
              disabled={candidate.locked}
            >
              <Radio label="Approve" value="Approve" />
              <Radio label="Decline" value="Decline" />
            </RadioGroup>
            <CommentBox
              state={[comment, setComment]}
              placeholderText="Leave a comment here, if desired..."
              disabled={candidate.locked}
            />
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
                    disabled={!candidate.data?.admission}
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
    </>
  );
};

export default Info2;
