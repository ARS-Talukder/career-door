
const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <span className="loading loading-bars w-8 mx-1 text-green-600"></span>
                <span className="loading loading-bars w-8 mx-1 text-green-500"></span>
                <span className="loading loading-bars w-8 mx-1 text-green-400"></span>
            </div>
        </div>
    );
};

export default Loading;