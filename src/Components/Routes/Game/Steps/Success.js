import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { end } from "./End.module.css";
import tiger from "./../../../../img/tiger.jpg";

const mapStateToProps = ({ user }) => {
  return { user };
};

const Success = ({ user }) => {
  const { username } = user;
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  return (
    <div className={end} hidden={loading ? true : false}>
      <h2>{username ? `${username}, you won today!` : "You won today!"}</h2>
      <p>Well done! Take a rest.</p>
      <div>
        <img src={tiger} alt="tiger" onLoad={handleOnLoad} />
      </div>
      <p>See you tomorrow!</p>
    </div>
  );
};

Success.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    joined: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

export default connect(mapStateToProps, null)(Success);
