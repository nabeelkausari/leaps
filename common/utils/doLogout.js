import { useRouter } from 'next/router'

export const doLogout = () => {
  localStorage.clear();
  const router = useRouter();
  router.push("/auth/login");
};
