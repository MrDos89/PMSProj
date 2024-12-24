import MiniGames from "./MiniGames";
import PhoneList from "./PhoneList";

import PropTypes from "prop-types";

function MainBody({ phones, ageHandle }) {
  return (
    <>
      <MiniGames />
      <div className="dropdown">
        <button onClick={() => ageHandle("모두")}>모두</button>
        <button onClick={() => ageHandle("10대")}>10대</button>
        <button onClick={() => ageHandle("20대")}>20대</button>
        <button onClick={() => ageHandle("30대")}>30대</button>
        <button onClick={() => ageHandle("40대")}>40대</button>
        <button onClick={() => ageHandle("50대")}>50대</button>
      </div>
      <PhoneList phones={phones} />
    </>
  );
}
MainBody.propTypes = {
  phones: PropTypes.array,
  ageHandle: PropTypes.func,
};

export default MainBody;
