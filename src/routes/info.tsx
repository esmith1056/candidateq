import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextArea,
  ControlGroup,
  RadioGroup,
  Radio,
  Spinner,
} from "@blueprintjs/core";

import CandidateInfo from "../components/CandidateInfo/CandidateInfo";
import { ICandidateInfo } from "../components/CandidateInfo/Types";

import { digestMessage, getRandomInt } from "../utils";
import "./info.css";

const Info = (): JSX.Element => {
  const [locked, setLocked] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ICandidateInfo | null>(null);
  const [status, setStatus] = useState<string | undefined>();
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !data && !error) {
      setFetching(true);
      try {
        const value = localStorage.getItem(id);
        if (value) {
          const data = JSON.parse(value);
          setLocked(true);
          setStatus(data.status);
          setComment(data.comment);
          setData(data);
        }
      } catch (e) {
        setError("Candidate not found");
      }
      setFetching(false);
    }
  }, [id, data, error]);

  const resetUI = () => {
    setLocked(false);
    setComment("");
    setStatus(undefined);
    setData(null);
    setError(null);
    setFetching(false);
    navigate("/info", { replace: true });
  };

  const handleSave = () => {
    if (!data) {
      setError("No data to save");
      return;
    }

    setSaving(true);
    const timeout = getRandomInt(100, 3500); // Give the illusion of latency
    console.log(timeout);
    setTimeout(async () => {
      const updatedData = { ...data, status, comment };
      let key = id;
      if (!key) {
        const hash = await digestMessage(
          `${data.name?.last}${data.name?.first}${data.dob?.date}`
        );
        key = hash.substring(0, 20);
      }
      localStorage.setItem(key, JSON.stringify(updatedData));
      setData(updatedData);
      setSaving(false);
      setLocked(true);
      navigate(`/info/${key}`, { replace: true });
    }, timeout);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target?.value !== comment) {
      setComment(event.target.value);
    }
  };

  const handleStatusChange = (event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement)?.value;
    setStatus(value);
  };

  const handleGetNewCandidate = async () => {
    const url = "https://randomuser.me/api/?exc=login";
    resetUI();
    setFetching(true);

    try {
      const res = await fetch(url);
      if (res.ok) {
        const { results } = await res.json();
        setData(results[0]);
      } else {
        setError(`Fetch error status ${res.status}`);
      }
    } catch (e) {
      setError("Big time fetch error");
    }
    setFetching(false);
  };

  return (
    <>
      {isFetching && (
        <div className="LoadingOverlay">
          <Spinner />
        </div>
      )}
      {!data && !isFetching && !error && (
        <div>Click the button to query a new candidate!</div>
      )}
      {data && !isFetching && <CandidateInfo data={data} />}
      {error && !isFetching && <div className="error">Error: {error}</div>}
      <div className="ReviewControls">
        {data ? (
          <>
            <RadioGroup
              inline={true}
              onChange={handleStatusChange}
              selectedValue={status}
              disabled={locked}
            >
              <Radio label="Approve" value="Approve" />
              <Radio label="Decline" value="Decline" />
            </RadioGroup>
            <TextArea
              placeholder="Leave a comment here, if desired..."
              fill={true}
              onChange={handleCommentChange}
              value={comment}
              disabled={locked}
            ></TextArea>
            <ControlGroup className="InfoControlGroup">
              <Button
                disabled={!locked}
                intent={locked ? "primary" : undefined}
                className="NewCandidateButton"
                icon="refresh"
                onClick={handleGetNewCandidate}
              >
                New Candidate
              </Button>
              {!locked ? (
                <>
                  <Button
                    intent="primary"
                    icon={isSaving ? "lock" : "saved"}
                    className="SaveButton"
                    onClick={() => handleSave()}
                    disabled={!status}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </>
              ) : (
                <Button
                  icon="lock"
                  className="EditButton"
                  onClick={() => setLocked(false)}
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

export default Info;
