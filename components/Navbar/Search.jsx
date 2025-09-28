
function Search(){
    return(
        <>
            <div className="search-container">
                <div className="search-bar">
                    <input type="text" name="search" id="search"/>
                    <button className="search-btn">
                        <i className="bi bi-search"></i>  
                    </button>
                </div>
            </div>
        </>
    );
}

export default Search;