import { FcSearch } from "react-icons/fc";
import '../style/style.css';

const Search = () => {
    const popularSearches = [
        { _id: 1, name: "Web Developer" },
        { _id: 2, name: "Web Designer" },
        { _id: 3, name: "Writer" },
        { _id: 4, name: "Frontend" },
        { _id: 5, name: "FullStack" },
        { _id: 6, name: "SQA" },
        { _id: 7, name: "Tester" },
        { _id: 8, name: "Team Lead" },
        { _id: 9, name: "JavaScript Developer" },
        { _id: 10, name: "Python Developer" },
        { _id: 11, name: "C++" },
        { _id: 12, name: "Coder" },
        { _id: 13, name: "Cyber Security" },
        { _id: 14, name: "MERN Stack" },
        { _id: 15, name: "Senior" },
        { _id: 16, name: "Junior" },
        { _id: 17, name: "Entry Level" },
        { _id: 18, name: "Experienced" },
        { _id: 19, name: "MEAN Stack" },
        { _id: 20, name: "Web Application" },
        { _id: 21, name: "Developer" },
        { _id: 22, name: "Software Engineer" },
        { _id: 23, name: "Software" },
        { _id: 24, name: "Django Developer" },
        { _id: 25, name: "Human Resource" },
        { _id: 26, name: "Communication Expert" },
        { _id: 27, name: "Assistant Engineer" },
    ]
    return (
        <div className="my-8">
            <section className="flex justify-center items-center">
                <h2 className="text-3xl font-bold mx-2">Diversify Your Job Search with Curated Job Boards </h2>
                <FcSearch className="text-4xl"></FcSearch>
            </section>

            {/* ----------Search Input Section-------- */}
            <section className="my-8">
                <form action="">
                    <input type="text" placeholder="Search Job Here..." className="input input-bordered w-2/5 rounded-2xl border-2 search_input" />
                </form>
            </section>

            {/* ----------Popular Search Section-------- */}
            <section>
                <h3 className="text-2xl font-bold text-gray-500">Popular Search</h3>
                <div className="w-3/4 mx-auto my-4 px-24">
                    {
                        popularSearches
                            .map(search =>
                                <button key={search._id} className="search_span_tag">
                                    {search.name}
                                </button>
                            )
                    }
                </div>
            </section>

        </div>
    );
};

export default Search;