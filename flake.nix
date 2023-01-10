{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    futils.url = "github:numtide/flake-utils";
    renogin.url = "git+https://gitlab.com/prologin/tech/tools/renogin.git";
  };

  outputs = { self, nixpkgs, futils, renogin } @ inputs:
    let
      inherit (nixpkgs) lib;
      inherit (lib) recursiveUpdate;
      inherit (futils.lib) eachDefaultSystem defaultSystems;

      nixpkgsFor = lib.genAttrs defaultSystems (system: import nixpkgs {
        inherit system;
      });
    in
    (eachDefaultSystem (system:
      let
        pkgs = nixpkgsFor.${system};
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            git
            pre-commit
            nodejs-18_x
            renogin.packages.${system}.default
            yarn
          ];
        };
      }
    ));
}
