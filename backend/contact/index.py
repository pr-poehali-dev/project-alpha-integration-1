import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта и отправляет письмо на spheremarketing@yandex.ru"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—")
    phone = body.get("phone", "—")
    message = body.get("message", "—")

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = "spheremarketing@yandex.ru"
    recipient = "spheremarketing@yandex.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = sender
    msg["To"] = recipient

    html = f"""
    <html><body style="font-family:sans-serif;color:#222;background:#f5f5f5;padding:24px;">
      <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="color:#1d4ed8;margin-top:0;">Новая заявка с сайта</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;width:140px;">Имя</td><td style="padding:8px 0;font-weight:600;">{name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Телефон / TG</td><td style="padding:8px 0;font-weight:600;">{phone}</td></tr>
          <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Сообщение</td><td style="padding:8px 0;">{message}</td></tr>
        </table>
      </div>
    </body></html>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as smtp:
        smtp.login(sender, smtp_password)
        smtp.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
