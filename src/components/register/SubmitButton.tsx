type SubmitButtonProps = {
  isLoading: boolean;
  text: string;
};

function SubmitButton({ isLoading, text }: SubmitButtonProps) {
  return (
    <span className="block w-full rounded-md shadow-sm">
      <button
        type="submit"
        disabled={isLoading}
        className={`focus:shadow-outline-indigo flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none ${
          isLoading
            ? "cursor-not-allowed bg-green-300"
            : "cursor-pointer bg-green-500 hover:bg-green-600 focus:border-green-700 active:bg-green-700"
        }`}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        ) : (
          text
        )}
      </button>
    </span>
  );
}

export default SubmitButton;
