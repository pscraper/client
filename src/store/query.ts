import { useQuery } from "@tanstack/react-query"
import { searchFile } from "../api/patch.api";


export const useSearchFile = (category: string) => {
    if (category == "adobe") return useAdobeFileList();
    else if (category == "dotnet") return useDotnetFileList();
    else if (category == "java") return useJavaFileList();
    return undefined;
}


const useDotnetFileList = () => {
    const result = useQuery({
        queryKey: ["dotnet_file"],
        queryFn: () => searchFile("dotnet"),
        staleTime: 30000
    });

    return result.data;
}


const useAdobeFileList = () => {
    const result = useQuery({
        queryKey: ["adobe_file"],
        queryFn: () => searchFile("adobe"),
        staleTime: 30000
    });

    return result.data;
}


const useJavaFileList = () => {
    const result = useQuery({
        queryKey: ["java_file"],
        queryFn: () => searchFile("java"),
        staleTime: 30000
    });

    return result.data;
}