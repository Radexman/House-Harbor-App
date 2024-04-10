function ThemeToggler() {
  return (
    <div>
      <div className="form-control">
        <label htmlFor="theme-radios" className="label cursor-pointer gap-4">
          <span className="label-text">Ligth</span>
          <input type="radio" name="theme-radios" className="theme-controller radio" value="light" />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="theme-radios" className="label cursor-pointer gap-4">
          <span className="label-text">Dark</span>
          <input type="radio" name="theme-radios" className="theme-controller radio" value="dark" />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="theme-radios" className="label cursor-pointer gap-4">
          <span className="label-text">Retro</span>
          <input type="radio" name="theme-radios" className="theme-controller radio" value="retro" />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="theme-radios" className="label cursor-pointer gap-4">
          <span className="label-text">Cyberpunk</span>
          <input type="radio" name="theme-radios" className="theme-controller radio" value="cyberpunk" />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="theme-radios" className="label cursor-pointer gap-4">
          <span className="label-text">Valentine</span>
          <input type="radio" name="theme-radios" className="theme-controller radio" value="valentine" />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="theme-radios" className="label cursor-pointer gap-4">
          <span className="label-text">Aqua</span>
          <input type="radio" name="theme-radios" className="theme-controller radio" value="aqua" />
        </label>
      </div>
    </div>
  );
}

export default ThemeToggler;
