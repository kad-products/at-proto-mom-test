module "repo" {
  source = "github.com/kad-products/platform//open-tofu/modules/github-repo?ref=v1.9.0"

  repo_name        = var.repo_name
  repo_description = "AT Proto Takes The Mom Test"
  is_product       = true
  required_checks = [
    "lint-commits / lint-commits",
    "run-tests / run-tests",
    "lint-code / lint-code",
    "create-release-dry-run / create-release-dry-run",
    "plan-github-setup / plan-open-tofu",
  ]
}
