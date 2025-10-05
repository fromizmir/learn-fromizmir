"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder="Search in all quizzes..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search')?.toString()}
      style={{
        width: '100%', padding: '12px', fontSize: '1rem',
        marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd',
      }}
    />
  );
}