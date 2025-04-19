"use client"

export default function SelectProperties({ status }: { status: string }) {
    return (
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border rounded-md"
            onChange={e => {
              const url = new URL(window.location.href);
              url.searchParams.set('status', e.target.value);
              url.searchParams.set('page', '1');
              window.location.href = url.toString();
            }}
            defaultValue={status}
          >
            <option value="all">Todas las propiedades</option>
            <option value="active">Propiedades activas</option>
            <option value="inactive">Propiedades inactivas</option>
          </select>
        </div>
    )
}