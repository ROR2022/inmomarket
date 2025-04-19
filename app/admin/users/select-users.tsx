"use client"


export default function SelectUsers({ role }: { role: string }) {
    return (
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border rounded-md"
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set('role', e.target.value);
              url.searchParams.set('page', '1');
              window.location.href = url.toString();
            }}
            defaultValue={role}
          >
            <option value="all">Todos los usuarios</option>
            <option value="admin">Solo administradores</option>
            <option value="user">Solo usuarios regulares</option>
          </select>
        </div>
    )
}
