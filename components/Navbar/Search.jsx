import { useState, useContext } from "react";
import { SidebarBtn } from "../../context/SidebarContext";

function Search() {
    const [input, setInput] = useState('')
    const { setText } = useContext(SidebarBtn)

    // set context funciton value to input 
    function filterSearch() {
        setText(input)
    }
    return (
        <>
            {/* Navbar search bar and button */}
            <div className="search-container">
                <div className="search-bar">
                    <input type="text" onChange={(e) => setInput(e.target.value)} />
                    {/* this triggers search by video title */}
                    <button className="search-btn" onClick={filterSearch}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Search;