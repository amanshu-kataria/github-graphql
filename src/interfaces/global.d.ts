interface Navigator {
  clipboard: {
    writeText(newClipText: string): Promise<void>;
  };
}
