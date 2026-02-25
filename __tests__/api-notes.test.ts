import handler from '@/src/pages/api/notes/index';

type MockRes = {
  statusCode?: number;
  headers: Record<string, string>;
  body?: any;
  status: (code: number) => MockRes;
  setHeader: (k: string, v: string) => void;
  json: (data: any) => void;
  end: () => void;
};

function makeRes(): MockRes {
  const res: MockRes = {
    headers: {},
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    setHeader(k: string, v: string) {
      res.headers[k] = v;
    },
    json(data: any) {
      res.body = data;
    },
    end() {
      return;
    },
  };
  return res;
}

describe('/api/notes', () => {
  it('GET returns json with notes', async () => {
    const req: any = { method: 'GET' };
    const res = makeRes();

    await handler(req, res as any);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('notes');
    expect(Array.isArray(res.body.notes)).toBe(true);
  });

  it('POST validates payload', async () => {
    const req: any = { method: 'POST', body: { title: '', content: '' } };
    const res = makeRes();

    await handler(req, res as any);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
