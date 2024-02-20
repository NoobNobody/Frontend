import SearchBar from "../components/SearchBar";
// import JobCategories from '../sitecomponents/JobCategories';

function HomePage() {


    return (
        <main>
            <div className="container mt-5">
                <div className="text-start mt-4">
                    <h2>Twoja nowa praca</h2>
                    <p>
                        Znajdź swoją nową pracę już dziś.
                    </p>
                </div>
                <div className="d-flex mt-5">
                    <SearchBar />
                </div>
                <div className="mt-5">
                    <h2 >Kategorie prac</h2>
                    <p>
                        Sprawdź ile prac mamy w najbardziej popularnych kategoriach.
                    </p>
                </div>
                <div className="mt-5">
                    {/* <JobCategories /> */}
                </div>
                <div className="mt-5">
                    XD
                </div>
            </div>
        </main>
    );
}

export default HomePage;