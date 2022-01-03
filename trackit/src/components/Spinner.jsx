import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./Spinner.css"

const Spinner = () => {
  return ( 
    <main className="loading">
    {/* <img 
      className="loading-image" 
      src="images/status.png" 
      alt="Loading" 
    /> */}
    <FontAwesomeIcon className="loading-image" icon={faCircleNotch} />
    </main>
   );
}
 
export default Spinner;