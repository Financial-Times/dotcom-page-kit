import ora from 'ora'
import inquirer from 'inquirer'
import CliProgress from 'cli-progress'
import { clearScreen, cursorShow } from 'ansi-escapes'

/**
 * CLI Messenger
 * @description Provides a shared toolset for formatted CLI output
 */
export class CliMessenger {
  spinner = ora()
  progressBar = new CliProgress.Bar(
    {
      format: '[ {bar} ] {percentage}% | ETA: {eta}s | {value}/{total}',
      stopOnComplete: true,
      clearOnComplete: true,
      hideCursor: true,
      linewrap: false
    },
    CliProgress.Presets.rect
  )

  setTitle(message) {
    stopSpinner(this)
    process.stdout.write(`-------------------------------------------------------------------------------\n`)
    process.stdout.write(`\n${message}\n\n`)
    process.stdout.write(`-------------------------------------------------------------------------------\n`)
    process.stdout.write('\n')
  }

  clearScreen() {
    process.stdout.write(clearScreen)
  }

  showCursor() {
    process.stdout.write(cursorShow)
  }

  newLine() {
    process.stdout.write('\n')
  }

  indicateActivity(message: string) {
    startSpinnerWith(this, message)
  }

  indicateSuccess(message: string) {
    this.spinner.succeed(message)
  }

  indicateFailure(error: any) {
    this.spinner.fail(error.stack || error)
  }

  stopIndicator() {
    stopSpinner(this)
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

  async ask(questions: any[]) {
    stopSpinner(this)
    return await inquirer.prompt(questions)
  }
}

function stopSpinner(CliMessenger: CliMessenger) {
  const { spinner } = CliMessenger
  if (spinner.isSpinning) {
    spinner.stop()
  }
}

function startSpinnerWith(CliMessenger: CliMessenger, message: string) {
  const { spinner } = CliMessenger
  if (spinner.isSpinning) {
    spinner.text = message
  } else {
    spinner.start(message)
  }
}
