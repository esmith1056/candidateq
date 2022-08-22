import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CandidateInfo from "../components/CandidateInfo/CandidateInfo";
import { ICandidateInfo } from "../components/CandidateInfo/Types";
import { Button, TextArea } from "@blueprintjs/core";

import { digestMessage } from "../utils";

const Info = (): JSX.Element => {
  const [locked, setLocked] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ICandidateInfo | null>(null);
  const [status, setStatus] = useState<string | null>(null);
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
    setStatus(null);
    setData(null);
    setError(null);
    setFetching(false);
    navigate("/info", { replace: true });
  };

  const handleSave = async () => {
    if (!data) {
      setError("No data to save");
      return;
    }

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
    setLocked(true);

    navigate(`/info/${key}`, { replace: true });
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target?.value !== comment) {
      setComment(event.target.value);
    }
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
      {isFetching && <div className="loading">LOADING...</div>}
      {!data && !isFetching && !error && (
        <div>Click the button to query a new candidate!</div>
      )}
      {data && !isFetching && <CandidateInfo data={data} />}
      {error && !isFetching && <div className="error">Error: {error}</div>}
      {data && (
        <div className="ReviewControls">
          <fieldset disabled={locked}>
            <label htmlFor="Approve">
              <input
                type="radio"
                name="status"
                value="Approve"
                checked={status === "Approve"}
                onChange={() => setStatus("Approve")}
              />
              Approve
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Reject"
                checked={status === "Reject"}
                onChange={() => setStatus("Reject")}
              />
              Reject
            </label>
          </fieldset>
          <TextArea
            placeholder="Leave a comment here, if desired..."
            fill={true}
            onChange={handleCommentChange}
            value={comment}
            disabled={locked}
          ></TextArea>
          {!locked ? (
            <Button
              className="SaveButton"
              onClick={() => handleSave()}
              disabled={status === null}
            >
              Save
            </Button>
          ) : (
            <Button className="EditButton" onClick={() => setLocked(false)}>
              Edit
            </Button>
          )}
        </div>
      )}

      <Button
        intent="primary"
        className="NewCandidateButton"
        icon="refresh"
        onClick={handleGetNewCandidate}
      >
        New Candidate
      </Button>
    </>
  );
};

export default Info;
