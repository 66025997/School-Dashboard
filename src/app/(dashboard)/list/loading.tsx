const Loading = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        </div>
    );
}

export default Loading;
