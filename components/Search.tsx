'use client';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Search({ placeholder, className }: { placeholder: string; className: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        //params.set('page', '1');
        if (term) {
            params.set('pretraga', term);
        } else {
            params.delete('pretraga');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 100);

    return (
        <div className={`w-full relative`}>
            <input
                className={cn("block w-full md:w-80 h-10 rounded-md border border-gray-200 p-[10px] text-sm outline-2 placeholder:text-gray-500 shadow-md dark:bg-dark dark:placeholder:text-darktext dark:text-darktext",className)}
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                //defaultValue={searchParams.get('query')?.toString()}
            />
        </div >
    );
}