function Search({ onChangeSearchInput, searchInputValue }) {
    return (
        <div
            className="
                search
                d-flex
                align-center
            "
        >
            <img
                alt="search"
                width={15}
                height={15}
                src="/img/search.svg"
                className="
                    mr-10
                "
            />
            <input
                placeholder="Поиск..."
                onChange={onChangeSearchInput}
                value={searchInputValue}
            ></input>
        </div>
    );
}

export default Search;