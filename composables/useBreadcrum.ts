import { useTitle } from "@vueuse/core";

interface Breadcrum {
  name: string;
  to?: string;
}
export const useBreadcrum = (data: Breadcrum[]) => {
  const breadcrum = useState<Breadcrum[]>('breadcrum', () => data);
  return {
    breadcrum
  };
}
