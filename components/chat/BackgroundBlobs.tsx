export function BackgroundBlobs() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-left"></div>
            <div className="absolute -right-10 -bottom-30 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-right"></div>
        </div>
    );
}
