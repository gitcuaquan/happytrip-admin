import { useTitle } from "@vueuse/core";


interface Breadcrum {
  name: string;
  to?: string;
}
export const useBreadcrum = () => {
  const breadcrum = useState<Breadcrum[]>('breadcrum', () => []);

 function setBreadcrum(data: Breadcrum[]) {
    breadcrum.value = data;
  }
  return {
    breadcrum,
    setBreadcrum
  };
}
