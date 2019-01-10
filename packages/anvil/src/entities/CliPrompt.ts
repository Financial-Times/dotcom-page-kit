import ora, { Ora } from 'ora'
import inquirer from 'inquirer'
import CliProgress from 'cli-progress'
import { clearScreen, cursorShow } from 'ansi-escapes'

/**
 * CLI Messenger
 * @description Provides a shared toolset for formatted CLI output
 */
export class CliPrompt {
  private spinner: Ora = ora()
  private progressBar = new CliProgress.Bar(
    {
      format: '[ {bar} ] {percentage}% | ETA: {eta}s | {value}/{total}',
      stopOnComplete: true,
      clearOnComplete: true,
      hideCursor: true,
      linewrap: false
    },
    CliProgress.Presets.rect
  )

  title(message) {
    this.stopSpinner()
    process.stdout.write(`-------------------------------------------------------------------------------\n`)
    process.stdout.write(`\n${message}\n\n`)
    process.stdout.write(`-------------------------------------------------------------------------------\n`)
    process.stdout.write('\n')
  }

  clearScreen() {
    process.stdout.write(clearScreen)
  }

  cursor() {
    process.stdout.write(cursorShow)
  }

  newLine() {
    process.stdout.write('\n')
  }

  activity(message: string) {
    if (this.spinner.isSpinning) {
      this.spinner.text = message
    } else {
      this.spinner.start(message)
    }
  }

  success(message: string) {
    this.spinner.succeed(message)
  }

  failure(error: any) {
    this.spinner.fail(error.stack || error)
  }

  stopSpinner() {
    if (this.spinner.isSpinning) {
      this.spinner.stop()
    }
  }

  startProgressBar(totalValue = 100, startValue = 0) {
    this.progressBar.start(totalValue, startValue)
  }

  stopProgressBar() {
    this.progressBar.stop()
  }

  updateProgressBar(value: number) {
    this.progressBar.update(value)
  }

  async questions(questions: any[]) {
    this.stopSpinner()
    return await inquirer.prompt(questions)
  }
}
