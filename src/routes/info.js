import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CandidateInfo from "../components/CandidateInfo/CandidateInfo";
import { digestMessage } from "../utils";

const Info = () => {
  const [locked, setLocked] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !data && !error) {
      setFetching(true);
      try {
        const data = JSON.parse(localStorage.getItem(id));
        setLocked(true);
        setStatus(data.status);
        setComment(data.comment);
        setData(data);
      } catch (e) {
        setError('Candidate not found')
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
    const updatedData = { ...data, status, comment };
    let key = id;
    if (!key) {
      const hash = await digestMessage(`${data.name?.last}${data.name?.first}${data.dob?.date}`);
      key = hash.substring(0,20);
    }

    localStorage.setItem(key, JSON.stringify(updatedData));
    setData(updatedData);
    setLocked(true);

    navigate(`/info/${key}`, { replace: true });
  };

  const handleCommentChange = (event) => {
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
      setError('Big time fetch error')
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
          <textarea
            placeholder="Leave a comment here, if desired..."
            onChange={handleCommentChange}
            value={comment}
            disabled={locked}
          ></textarea>
          {!locked ? (
            <button
              className="SaveButton"
              onClick={() => handleSave(true)}
              disabled={status === null}
            >
              Save
            </button>
          ) : (
            <button className="EditButton" onClick={() => setLocked(false)}>
              Edit
            </button>
          )}
        </div>
      )}

      <button className="NewCandidateButton" onClick={handleGetNewCandidate}>
        New Candidate
      </button>
    </>
  );
};

export default Info;
