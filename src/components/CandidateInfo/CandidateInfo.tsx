const formatID = (name?: string, value?: string) =>
  name && value ? `${name}::${value}` : "N/A";

const CandidateInfo = ({
  data,
}: {
  data: Record<string, any>;
}): JSX.Element => {
  return (
    <div className="CandidateInfo">
      <div className="CandidatePhoto">
        <img
          src={data.picture?.large}
          alt={`${data.name?.title}. ${data.name?.first} ${data.name?.last}`}
        />
      </div>

      <table className="CandidateDetails">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>
              {data.name?.title}. {data.name?.first} {data.name?.last}
            </td>
          </tr>
          <tr>
            <th scope="row">Gender</th>
            <td>{data.gender}</td>
          </tr>
          <tr>
            <th scope="row">D.O.B.</th>
            <td>{data.dob?.date}</td>
          </tr>
          <tr>
            <th scope="row">Age</th>
            <td>{data.dob?.age}</td>
          </tr>
          <tr>
            <th scope="row">Address</th>
            <td>
              {data.location?.street?.number}, {data.location?.street?.name}
              <br />
              {data.location?.city}, {data.location?.state}
              <br />
              {data.location?.country}, {data.location?.postcode}
            </td>
          </tr>
          <tr>
            <th scope="row">Time Zone</th>
            <td>{data.location?.timezone?.description}</td>
          </tr>
          <tr>
            <th scope="row">UTC Offset</th>
            <td>{data.location?.timezone?.offset}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>
              <a href={`mailto:{data.email}`}>{data.email}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">Phone</th>
            <td>{data.phone}</td>
          </tr>
          <tr>
            <th scope="row">Cell</th>
            <td>{data.cell}</td>
          </tr>
          <tr>
            <th scope="row">Registered</th>
            <td>
              {data.registered?.date} at age {data.registered?.age}
            </td>
          </tr>
          <tr>
            <th scope="row">ID</th>
            <td>{formatID(data.id?.name, data.id?.value)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CandidateInfo;
