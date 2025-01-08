import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let mock;
  const testLevel = 'log';

  beforeEach(() => {
    logger = new TskvLogger();
    mock = jest.spyOn(console, testLevel).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be console message in json format', () => {
    const testMessage = 'json test message';
    const testParams = 'test params';
    logger.log(testMessage);
    const expected = `level=${testLevel}\tmessage=${testMessage}\toptionalParams=${testParams}\n`;
    expect(mock).toHaveBeenCalledWith(expected);
  });
});
