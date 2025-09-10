import dynamic from "next/dynamic";
const ErrorContent = dynamic(() => Promise.resolve(() => <h1>404 - Page Not Found</h1>), { ssr: false });
export default ErrorContent;
