export const AppConfig = {
    appName: "Odette App",
    appMode: process.env.NEXT_PUBLIC_MODE as "development" | "production",
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    mediaUrl: process.env.NEXT_PUBLIC_MEDIA_URL
};
