import Employee from '../pages/Main/pages/List/components/Row/employee';

const map = new Map<string, Employee[]>();
let initialData: Employee[];

const search = (text: string) => {
  if (text === '') {
    return initialData;
  }

  if (map.has(text) && text.length === 1) {
    const res = map.get(text);
    if (res) return res;
  }

  return initialData.filter(elem => (
    elem.name.toLowerCase().includes(text.toLowerCase()) ||
    elem.email.toLowerCase().includes(text.toLowerCase()) ||
    elem.group.toLowerCase().includes(text.toLowerCase()) ||
    elem.phone.includes(text)
  ));
};

function initSearch(data: Employee[]) {
  initialData = data;
  const set = new Set<string>();
  for (const elem of data) {
    elem.name.split('').forEach(char => set.add(char.toLowerCase()));
    elem.group.split('').forEach(char => set.add(char.toLowerCase()));
    elem.email.split('').forEach(char => set.add(char.toLowerCase()));
    elem.phone.split('').forEach(char => set.add(char));
  }

  for (const char of set) {
    const res = search(char);
    if (res) {
      map.set(char, res);
    }
  }
}

onmessage = e => {
  if (e.data.type === 'init') {
    postMessage(initSearch(e.data.data));
  } else {
    console.time('search');
    postMessage(search(e.data.data));
    console.timeEnd('search');
  }
};
